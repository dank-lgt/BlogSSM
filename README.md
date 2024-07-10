@[toc]
# 个人博客自动化测试

## 一、博客页面

登录页面
![登录](https://img-blog.csdnimg.cn/direct/1d68cc8a5cbe4efe8b343cc32975bd87.png#pic_center)
注册页面
![注册](https://img-blog.csdnimg.cn/direct/8c325bbdeefb47e1b7e42f8de372f534.png#pic_center)
博客列表页![](https://img-blog.csdnimg.cn/direct/580c5240a5484f50919f9115c8f54e55.png#pic_center)
个人博客列表页
![](https://img-blog.csdnimg.cn/direct/fdc72347292a45e6b53e409b0ebbbf16.png#pic_center)
博客正文页
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/2f785867a8364ca4bb6774a32b46da23.png#pic_center)
博客编辑页
![](https://img-blog.csdnimg.cn/direct/83863962929c492887e6f861bf6501b7.png#pic_center)个人中心
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/9dca8280cd854cd487274b8e3e7f8cbb.png#pic_center)
修改头像页![请添加图片描述](https://img-blog.csdnimg.cn/direct/78d356b66b794451bcbd0eafa8eb8c14.png)
## 二、博客自动化测试用例
![博客用例](https://img-blog.csdnimg.cn/direct/a36fa9c61ae142a58ead6bb61cf20a47.png)
## 三、自动化测试

### 1）环境搭建

1、selenium环境搭建

2、在IDEA创建Maven项目，导入pom.xml相关依赖
![请添加图片描述](https://img-blog.csdnimg.cn/direct/5d1141f6c0154cb384e2396b77321ed6.png)
3、初始化浏览器驱动，因为在运行每个自动化测试用例之前都需要进行创建驱动，运行所有的测试方法结束之后来需要释放浏览器驱动，于是此时创建一个类来初始化浏览器驱动和释放浏览器
```
public class InitAndEnd {
    static EdgeDriver edgeDriver;
    @BeforeAll
    static void SetUp() {
        edgeDriver = new EdgeDriver();
    }
    @AfterAll
    static void TearDown() {
        edgeDriver.quit();
    }
}\
```
### 2) 登录测试代码

#### 成功用例

```
@Order(1)
@ParameterizedTest
@CsvFileSource(resources = "LoginSuccess.csv")
void LoginSuccess(String username, String password, String blog_list_url) {
System.out.println(username + password + blog_list_url);
// 打开博客登录页面
edgeDriver.get("http://10.181.214.198:8081/login.html");
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
// 输入账号admin
edgeDriver.findElement(By.cssSelector("#username")).sendKeys(username);
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
// 输入密码123
edgeDriver.findElement(By.cssSelector("#password")).sendKeys(password);
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
// 点击提交按钮
edgeDriver.findElement(By.cssSelector("#submit")).click();
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
// 跳转到列表页
// 获取到当前页面url
String cur_url =edgeDriver.getCurrentUrl();
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
Assertions.assertEquals(blog_list_url, cur_url);
// 列表页展示用户信息是admin
// 用户名是admin测试通过，否则测试不通过
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
String cur_admin = edgeDriver.findElement(By.cssSelector("#master")).getText();
Assertions.assertEquals(username, cur_admin);
}
```
![请添加图片描述](https://img-blog.csdnimg.cn/direct/7944ab10d5a747548bf7b052fd631182.png)
#### 失败用例

```
@Order(1)
@ParameterizedTest
@CsvSource({"wang,123456", "add,123456"})
// 验证用户名或者密码错误情况
void LoginFail(String username, String password) throws InterruptedException {
// 打开博客登录界面
edgeDriver.get("http://10.181.214.198:8081/login.html");
// 隐式等待3秒钟
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

edgeDriver.findElement(By.cssSelector("#username")).sendKeys(username);
// 隐式等待3秒钟
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
// 输入密码：123456
edgeDriver.findElement(By.cssSelector("#password")).sendKeys(password);
// 隐式等待3秒钟
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
// 点击提交按钮
edgeDriver.findElement(By.cssSelector("#submit")).click();
// 强制等待3秒钟
sleep(2000);
// 获取弹窗内容 == 登录失败！用户名或密码错误，请重新输入 登录失败
String text = edgeDriver.switchTo().alert().getText();//跳转到弹窗  点击确认,如果有取消按钮就用dismiss()方法
Assertions.assertEquals("登录失败！用户名或密码错误，请重新输入", text);
//点击弹窗确定按钮
edgeDriver.switchTo().alert().accept();
// 判断当前跳转页面url == http://10.181.214.198:8081/login.html 测试通过  否则测试不通过）
String url = edgeDriver.getCurrentUrl();
Assertions.assertEquals("http://10.181.214.198:8081/login.html", url);
}
```
![请添加图片描述](https://img-blog.csdnimg.cn/direct/74647370e04a4cd6b2434c1fec82949b.png)
> 注意：因为我需要进行验证码验证登录，在测试我已将验证码验证部分去除
### 3）博客列表页测试代码

```
@Order(2)
@Test
void BlogList() {
// 打开博客列表页
edgeDriver.get("http://10.181.214.198:8081/blog_list.html");
// 获取页面上所有博客标题对应的元素
edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
int title_num = edgeDriver.findElements(By.cssSelector(".title")).size();
// 如果元素数量不为0，测试通过
Assertions.assertNotEquals(0 ,title_num);
}
```
![请添加图片描述](https://img-blog.csdnimg.cn/direct/24297d2839d0430099c566d8ee4118b9.png)
### 4）博客正文页测试代码
```
@Order(4)
@ParameterizedTest
@MethodSource("Generator")
void BlogDetail(String expected_url, String expected_title, String expected_blog_title) {
    // 找到第一篇博客对应的产看全文按钮
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    edgeDriver.findElement(By.xpath("/html/body/div[2]/div[2]/div[1]/a")).click();
    // 获取当前页面url
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    String cur_url = edgeDriver.getCurrentUrl();
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    // 获取当前页面title
    String cur_title = edgeDriver.getTitle();
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    // 获取博客标题
    String cur_blog_title = edgeDriver.findElement(By.cssSelector("body > div.container > div.right > div > h3")).getText();
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    Assertions.assertEquals(expected_title ,cur_title);
    Assertions.assertEquals(expected_blog_title, cur_blog_title);
    if(cur_url.contains(expected_url)) {
        System.out.println("测试通过");
    } else {
        System.out.println(cur_url);
        System.out.println("测试不通过");
    }
}
```
![请添加图片描述](https://img-blog.csdnimg.cn/direct/56d66281742841dd9d58a2c187a4198d.png)
### 5）博客编辑页测试代码

1.发布博客

    @Order(5)
    @Test
    void BlogEdit() throws InterruptedException {
    // 找到写博客按钮并点击
    webDriver.findElement(By.cssSelector("body > div.nav > a:nth-child(5)")).click();
    // 隐式等待3秒
    webDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    // 找到输入框输入标题
    webDriver.findElement(By.cssSelector("#title")).sendKeys("自动化测试");
    // 隐式等待3秒
    webDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    // 点击发布按钮
    webDriver.findElement(By.cssSelector("body > div.blog-edit-container > div.title > button")).click();
    // 点击发布文章跳出弹窗进行确认
    sleep(2000);
    webDriver.switchTo().alert().accept();
    // 强制等待2秒
    sleep(2000);
    webDriver.switchTo().alert().accept();
    // 强制等待2秒
    sleep(2000);
    webDriver.switchTo().alert().dismiss();
    // 效验发布成功跳转页面url == 博客文章列表页url
    String url = webDriver.getCurrentUrl();
    Assertions.assertEquals("http://10.181.214.198:8081/myblog_list.html", url);
    }

2.校验发布的博客

```
@Order(5)
@Test
void BlogInfoChecked() {
    edgeDriver.get("http://10.181.214.198:8081/blog_list.html");
    // 获取第一篇博客标题
    String first_blog_title = edgeDriver.findElement(By.cssSelector("body > div.container > div.right > div:nth-child(1) > div.title")).getText();
    // 获取第一篇博客发布时间
    String first_blog_time = edgeDriver.findElement(By.xpath("/html/body/div[2]/div[2]/div[1]/div[2]")).getText();
    // 校验博客标题是不是自动化测试
    Assertions.assertEquals("自动化测试", first_blog_title);
    if(first_blog_title.contains("2023-06-03")) {
        System.out.println("测试通过");
    } else {
        System.out.println("当前时间是：" + first_blog_time);
        System.out.println("测试不通过");
    }
}
```
![请添加图片描述](https://img-blog.csdnimg.cn/direct/8c5cb5b3157f4905915712d231f535a8.png)
### 6）博客删除测试代码

```
@Order(6)
@Test
void DeleteBlog() throws InterruptedException {
    // 打开博客列表页面
    edgeDriver.get("http://10.181.214.198:8081/blog_list.html");
    // 点击全文按钮
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    edgeDriver.findElement(By.cssSelector("body > div.container > div.right > div:nth-child(1) > a")).click();
    // 点击删除按钮
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    edgeDriver.findElement(By.cssSelector("body > div.nav > a:nth-child(7)")).click();
    sleep(3000);
    // 博客列表页第一篇博客标题不是“自动化测试”
    String first_blog_title = edgeDriver.findElement(By.xpath("/html/body/div[2]/div[2]/div[1]/div[1]")).getText();
    // 校验当前博客标题不等于“自动化测试”
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    Assertions.assertNotEquals(first_blog_title, "自动测试");
}
```

### 7）注销测试代码

```
@Order(7)
@Test
void Logout() {
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    edgeDriver.findElement(By.cssSelector("body > div.nav > a:nth-child(6)")).click();
    edgeDriver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    // 校验url(登录url)
    String cur_url = edgeDriver.getCurrentUrl();
    Assertions.assertEquals("http://10.181.214.198:8081/blog_login.html", cur_url);
    // 校验提交按钮
    WebElement webElement = edgeDriver.findElement(By.cssSelector("#submit"));
    Assertions.assertNotNull(webElement);
}
```
### 完整测试
![请添加图片描述](https://img-blog.csdnimg.cn/direct/a6fc345ef39d42dcbe222523c5a74956.png)
