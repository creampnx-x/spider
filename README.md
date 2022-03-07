# spider
北京林业法大学自动报平安
## 声明
https://s.bjfu.edu.cn/robots.txt 访问是404
## 需要环境
  nodejs v10.0 以上
## 执行（命令行）
 ```bash
 git clone []
 ```
 ``` bash
 yarn 
 # 或者
 npm install 
 ```
 ```bash
 node index [id] [password] 
 例如:
 node index 123432 12345678
 ```
### 注意
目前仅支持上报上一次的数据！
目前代码定时在九点十分开始报平安进程！
可以修改以下代码
```js
function nodeScheduleRule(){
	var rule = new nodeSchedule.RecurrenceRule();
	rule.hour =9 // 设置小时
  	rule.minute = 10 // 分钟
	nodeSchedule.scheduleJob(rule,test);
}
```
