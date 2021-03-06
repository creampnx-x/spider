let puppeteer = require('puppeteer');
const nodeSchedule = require('node-schedule');

function nodeScheduleRule() {
	const rule = new nodeSchedule.RecurrenceRule();
	rule.hour = 10; //设置时间
	rule.minute = 0;
	nodeSchedule.scheduleJob(rule, test);
}

async function test() {
	var userId = process.argv[2]
	var password = process.argv[3]

	let options = {
		headless: true,
		defaultViewport: {
			width: 1000,
			height: 800
		},
		slowMo: 250
	}

	let browser = await puppeteer.launch(options)
	let page = await browser.newPage();

	if (userId == undefined || userId.length == 0 || password.length == 0) {
		console.log("Please enter your password follow back")
		process.exit(0)
	} else {
		console.log("userId:" + userId + " password:" + password)
	}
	await page.goto('https://s.bjfu.edu.cn/tp_fp/view?m=fp#from=hall&serveID=99f0cf19-3ca4-4786-badb-521f0f734cad&act=fp/serveapply');

	let un = await page.$('input[id="un"]');
	un.focus();
	await page.keyboard.type(userId.toString());//账号
	let pd = await page.$('input[id="pd"]');
	pd.focus();
	await page.keyboard.type(password.toString());//密码
	let log = await page.$('.login_box_landing_btn');
	log.click();

	console.log('now,it is log in!');
	let pageSec = await browser.newPage();
	setTimeout(async () => {
		await pageSec.goto('https://s.bjfu.edu.cn/tp_fp/view?m=fp#from=hall&serveID=99f0cf19-3ca4-4786-badb-521f0f734cad&act=fp/serveapply', { waitUntil: 'networkidle0' });
		let commit = await pageSec.$('#commit');
		commit.click();
		console.log('it looks like that works are done.')
		setTimeout(() => browser.close(), 30000)
	}, 5000);
	/* 
	页面分析
	返回，用于测试
	<button class="btn btn-default  pull-right btn-block" type="button" onclick="if(navigator.userAgent.indexOf('Firefox')>-1){window.history.go(-2);}else{window.history.go(-1)}">返回</button>
	pd 密码框
	<input type="password" class="login_box_input password-pic pic-input" id="pd" placeholder="密码">
	un 账号框
	<input type="text" class="login_box_input user-pic pic-input" id="un" placeholder="账号" style="margin-top:13px">
	登录按钮
	<input type="button" class="login_box_landing_btn">
	报平安按钮
	<button class="btn btn-primary  pull-left btn-block" type="button" id="commit" disabled="disabled">提交</button>
	没啥用
	<div uname="svs" class="box" style="cursor:pointer;" serveid="99f0cf19-3ca4-4786-badb-521f0f734cad" collect_id="" formid="7394b770-ba93-4041-91b7-80198a68" procid="bae380db-7db4-4c7c-9458-d79188fa359a" name="北林师生报平安（学生）">
						</div>
						*/
}
nodeScheduleRule();
