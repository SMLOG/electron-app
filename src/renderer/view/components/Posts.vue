<template>
  <div
    id="posts"
    ref="m_posts"
    v-show="item && m_posts_item"
    style="position: fixed;top: 35px;right:0;left: 200px;bottom: 0px;background: #eee;z-index: 1000;overflow:auto;padding-top:25px;"
  >
    <div
      v-if="item"
      style="color:#FFF;font-weight:bold;background:#666;top:35;position:fixed;top:25px;"
    >{{ item.name }}({{ item.code }})</div>
    <div v-for="(post, i) in m_posts" :key="i" class="post">
      <div>
        <span class="post_title">{{ post.post_user.user_nickname }}:</span>
        <span class="post_time">{{ post.post_publish_time }}</span>
      </div>
      <div class="post_content">
        <b v-if="post.content_type>0">[研报]</b>
        {{ post.post_content||post.post_title }}
        <a
          v-if="post.post_pdf_url"
          class="link pdf"
          @click="viewPdf(post.post_pdf_url)"
        >PDF</a>
      </div>
      <div v-if="post.replies" class="replies">
        <div v-for="rep in post.replies.re" :key="rep.reply_id" class="reply">
          <span>{{ rep.reply_user.user_nickname }}</span>:
          <span>{{ rep.reply_text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function getPosts(id, type = 1) {
  const data = {
    path: "/content/api/Post/ArticleContent",
    env: "2",
    param: `postid=${id}&type=0`
  };
  if (type == 2) {
    data.path = "/reply/api/Reply/ArticleReplyList";
    data.param = `postid=${id}&type=0&sort=1&ps=30&p=1&replyid=`;
  }
  return axios({
    method: "post",
    url:
      "http://mguba.eastmoney.com/interface/GetData.aspx?mt=" + Math.random(),
    headers: {
      Referer: `http://mguba.eastmoney.com/mguba/article/0/${id}`
    },
    data: Object.keys(data)
      .map(k => `${k}=${encodeURIComponent(data[k])}`)
      .join("&")
  }).then(function(response) {
    return response.data;
  });
}

window.getPosts = getPosts;
export default {
  name: "Posts",
  data: function() {
    return { m_posts_item: null, m_posts: [] };
  },

  mounted() {
    window.axios = this.$electron.remote.getGlobal("axios");

    window.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 27:
          this.m_posts_item = null;
          break;
        default:
      }
    });

    let time = 0;
    this.$refs.m_posts.addEventListener("scroll", event => {
      if (
        this.$refs.m_posts.scrollTop + this.$refs.m_posts.clientHeight >=
        this.$refs.m_posts.scrollHeight - 30
      ) {
        if (+new Date() - time > 1000) {
          time = +new Date();
          this.loadPosts(this.m_posts_item);
        }
      }
    });

    window.addEventListener("click", e => {
      if (
        this.$refs.m_posts &&
        !this.$refs.m_posts.contains(e.target) &&
        e.target.className.indexOf("post_bt") == -1
      ) {
        this.m_posts_item = null;
      }
    });
  },

  props: ["item"],
  methods: {
    loadPosts(item) {
      (async () => {
        let p = this.m_posts ? Math.floor(this.m_posts.length / 20) + 1 : 1;
        let jurl = `https://wap.eastmoney.com/info/guba/GetApiResultNewCore?url=webarticlelist%2Fapi%2FArticle%2FArticleListForMobile&query=${encodeURIComponent(
          "code=" + item.code + "&sorttype=0&ps=20&p=" + p
        )}&type=POST&cb=gubadata&callback=jsonp10`;
        let result = await fetch(jurl).then(res => res.text());
        let posts = null;
        window.gubadata = p => {
          if (!this.m_posts) {
            this.m_posts = [];
          }
          posts = JSON.parse(p.Result).re;
          posts = posts.filter(
            e => e.post_user.user_nickname.indexOf("证券") == -1
          );

          this.m_posts = this.m_posts.concat(posts);

          this.m_posts_item = item;
        };
        eval(result);

        if (posts) {
          for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            if (post.post_comment_count) {
              let replies = await getPosts(post.post_id, 2);
              post.replies = replies;
            }
          }
        }

        //  .then(res => res.json())
        //.then(data => JSON.parse(data.Result));
        //this.m_posts = result.re;
      })();
    },
    showMessage(item) {
      if (item == null) {
        return (this.m_posts_item = null);
      }
      this.m_posts_item = item;
      this.m_posts = null;
      this.loadPosts(item);

      /*
        let url=`http://mguba.eastmoney.com/interface/GetData.aspx?mt=0.6259930282217008`;

       let data = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({path:'/reply/api/Reply/ArticleReplyList',env:2,param:'postid=908679981&type=0&sort=1&ps=30&p=1&replyid='})
});*/
      this.getArcContent();
    },
    getArcContent() {
      let n = {};
      n.url = "http://mguba.eastmoney.com/interface/GetData.aspx";
      n.data = {};
      n.data.path = "/reply/api/Reply/ArticleReplyList";
      n.data.env = 2;
      n.type = "POST";
      var l = "postid=908679981&type=0&sort=1&ps=30&p=1&replyid=";
      n.data.param = encodeURIComponent(l);
      this.ajax(n);
    },
    ajax(e) {
      var t = (e = e || {}).type || "GET";
      t = t.toUpperCase();
      var s = e.url,
        o = e.async || !0,
        a = e.contentType || "application/x-www-form-urlencoded;charset=UTF-8",
        i = e.data || "",
        n = [];
      for (var r in i) n.push(r + "=" + i[r]);
      var l = "";
      n.length > 0 && (l = n.join("&"));
      var c,
        p = {
          successCall: null,
          success: function(e) {
            return (p.successCall = e), p;
          },
          errorCall: null,
          error: function(e) {
            return (p.errorCall = e), p;
          },
          request: null
        };
      try {
        c = new XMLHttpRequest();
      } catch (e) {}
      return (
        c &&
          ("GET" == t
            ? (c.open(t, s + "?" + l + "&mt=" + Math.random(), o),
              (c.withCredentials = !0),
              c.send(null))
            : (c.open(t, s + "?mt=" + Math.random(), o),
              (c.withCredentials = !0),
              c.setRequestHeader("Content-Type", a),
              c.send(l)),
          (c.onreadystatechange = function() {
            if (4 == c.readyState)
              if (200 == c.status) {
                var e = c.responseText;
                p.successCall && p.successCall(e);
              } else p.errorCall && p.errorCall(c);
          })),
        (p.request = c),
        p
      );
    },
    viewPdf(url) {
      let pdfwin = this.$electron.remote.require("electron-pdf-window");

      const win = new this.$electron.remote.BrowserWindow({
        width: Math.min(1024, window.outerWidth),
        height: window.outerHeight - 40
      });

      pdfwin.addSupport(win);
      win.loadURL(url);
      win.on("blur", () => {
        win.close();
        win.destroy();
      });
    }
  },
  computed: {},
  watch: {
    item(nv, ov) {
      this.showMessage(nv);
    }
  }
};
</script>
<style scoped>
.post {
  border-bottom: 1px dashed #aaa;
  margin: 5px;
  clear: both;
  font-size: 12px;
}
.post .post_title {
  float: left;
}
.post .post_time {
  float: right;
}
.post_content {
  clear: both;
  margin: 10px;
}
.replies {
  background-color: #bbb;
  padding: 5px;
  margin: 5px;
}
.pdf {
  color: blue;
  text-decoration: underline;
}
</style>
