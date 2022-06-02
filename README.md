<style>
html, body, .ui-content {
    background-color: #333;
    color: #ddd;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
    color: #ddd;
}

.markdown-body h1,
.markdown-body h2 {
    border-bottom-color: #ffffff69;
}

.markdown-body h1 .octicon-link,
.markdown-body h2 .octicon-link,
.markdown-body h3 .octicon-link,
.markdown-body h4 .octicon-link,
.markdown-body h5 .octicon-link,
.markdown-body h6 .octicon-link {
    color: #fff;
}

.markdown-body img {
    background-color: transparent;
}

.ui-toc-dropdown .nav>.active:focus>a, .ui-toc-dropdown .nav>.active:hover>a, .ui-toc-dropdown .nav>.active>a {
    color: white;
    border-left: 2px solid white;
}

.expand-toggle:hover, 
.expand-toggle:focus, 
.back-to-top:hover, 
.back-to-top:focus, 
.go-to-bottom:hover, 
.go-to-bottom:focus {
    color: white;
}


.ui-toc-dropdown {
    background-color: #333;
}

.ui-toc-label.btn {
    background-color: #191919;
    color: white;
}

.ui-toc-dropdown .nav>li>a:focus, 
.ui-toc-dropdown .nav>li>a:hover {
    color: white;
    border-left: 1px solid white;
}

.markdown-body blockquote {
    color: #bcbcbc;
}

.markdown-body table tr {
    background-color: #5f5f5f;
}

.markdown-body table tr:nth-child(2n) {
    background-color: #4f4f4f;
}

.markdown-body code,
.markdown-body tt {
    color: #eee;
    background-color: rgba(230, 230, 230, 0.36);
}

a,
.open-files-container li.selected a {
    color: #5EB7E0;
}
</style>
###### tags: `Firebase` `駿騰` `tag` 
# Firebase 實作3

## 將Apple登入與其它登入方式整合
:::danger
Q：Apple ID 登入無法順利切換畫面
A：因為使用了兩個API KEY，使用同一個就可以了
:::

## 需要知道的知識
:::success
- React
- React hooks
- [React Router v6](https://ithelp.ithome.com.tw/articles/10282773)
:::

## 有使用到的CSS框架
:::success
- react-bootstrap
- MUI (極少數，較推薦使用)
:::

## 相關資料
:::warning
- 第三方登入套件－[FirebaseUI](https://github.com/firebase/firebaseui-web-react)
- CSS框架－[React Bootstrap](https://react-bootstrap.github.io/)
- CSS框架－[MUI](https://mui.com/zh/)
:::


## 系統設計
:::warning
 - firebase： 與 firebase 做串聯
 - env.local： 存放API KEY
 - App： 控制畫面跳轉
 - AuthContext： 用戶驗證
:::
![](https://i.imgur.com/jD8Lh29.png)
