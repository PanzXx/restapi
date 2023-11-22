__path = process.cwd()

var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 3000 || 80
const username = "pansh";
const password = "bu0johzUWDK5m9Qv";
const cluster = "pansh.yn2wgy4";
var { color } = require('./lib/color.js')
var mongoose = require('mongoose')
var apirouter = require('./routes/api')
var mainrouter = require('./routes/main')
var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("assets"))

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
  }
);
const visitorSchema = new mongoose.Schema({
	name: String,
	count: Number
})
const Visitor = mongoose.model("Visitor",visitorSchema)
app.get('/count', async function(req,res){
	let visitors = await Visitor.findOne({name: 'PanZs-Rest-APIs'})
	if(visitors == null) {
		const beginCount = new Visitor({
			name : 'PanZs-Rest-APIs',
			count : 1
		})
		beginCount.save()
		res.json({
			value: '1'
			})
	} else {
		visitors.count += 1;
		visitors.save()
		res.json({
			value: visitors.count
			})
	}
})

app.get('/', (req, res) => {
    res.sendFile(__path + '/docs/home.html')
})
app.get('/docs', (req, res) => {
    res.sendFile(__path + '/docs/index.html')
})
app.get('/aboutme', (req, res) => {
    res.sendFile(__path + '/docs/aboutme.html')
})
app.get('/kontakme', (req, res) => {
    res.sendFile(__path + '/docs/contactme.html')
})
app.get('/kalkulator', (req, res) => {
    res.sendFile(__path + '/docs/kalkulator.html')
})
app.get('/pwmaker', (req, res) => {
    res.sendFile(__path + '/docs/pwmaker.html')
})
app.get('/uagent', (req, res) => {
    res.sendFile(__path + '/docs/useragent.html')
})







app.use('/api', apirouter)
app.use("/", mainrouter)

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT,'green'))
})

module.exports = app
