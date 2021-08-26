# spider
自动报平安
## 声明
https://s.bjfu.edu.cn/robots.txt <br>访问是404
## 需要环境
  node v10.0 ++
## 包管理
  详情查看 package.json
## 执行
 ```bash
 git clone `url`
 ```
 ``` bash
 yarn __OR__ npm i 
 ```
 ```bash
 node index [id] [password] 
 例如:
 node index 201002716 12345678
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
