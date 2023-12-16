


var express = require('express');
var app = express();
var fs = require('fs');





// ----------------------------------------------------------------------------
// Connecting to Firebase (Firestore Database)
// ----------------------------------------------------------------------------
var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");
var serviceAccount = require("./web-final-project-afb6f-firebase-adminsdk-3hgcd-439c0ceb39.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();

async function saveSignupInfo(id, password) {
  db.collection("Member information").doc(id).set({
    pw: password,
    point: "1000",
  });
}


// ----------------------------------------------------------------------------


// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// node.js의 웹프레임워크인 Express는 각종 이미지 파일이나 js, css 파일들을 추가할때마다 
// 해당 파일을 불러오기 위하여 router 설정을 하나하나 일일이 하지 않고, 불러올 수 있도록 간단하게 설정할 수 있다. 
// 이를 정적파일 세팅이라고 한다. 아래가 정적파일 세팅이다.
// app.use(express.static('image')) -> image파일 정적 세팅 

//style 파일 불러오기
app.use(express.static('style'));
//assets 파일 불러오기
app.use(express.static('assets'));

app.use(express.static('js'));



app.get('/', function(req, res) { 
    res.sendFile(__dirname + '/views/login.html');
});


app.get('/main', function(req, res) {
  fs.readFile('views/main.html', function(err,data){
    res.writeHead(200, {'Context-Type':'text/html'});
    res.end(data);    
  })
});


app.get('/account', function(req, res) {
  fs.readFile('views/account.html', function(err,data){
    res.writeHead(200, {'Context-Type':'text/html'});
    res.end(data);    
  })
});

app.get('/product1', function(req, res) {
  fs.readFile('views/product1.html', function(err,data){
    res.writeHead(200, {'Context-Type':'text/html'});
    res.end(data);    
  })
});

app.get('/product2', function(req, res) {
  fs.readFile('views/product2.html', function(err,data){
    res.writeHead(200, {'Context-Type':'text/html'});
    res.end(data);    
  })
});

app.get('/product3', function(req, res) {
  fs.readFile('views/product3.html', function(err,data){
    res.writeHead(200, {'Context-Type':'text/html'});
    res.end(data);    
  })
});

app.get('/success', function(req, res) {
  fs.readFile('views/success.html', function(err,data){
    res.writeHead(200, {'Context-Type':'text/html'});
    res.end(data);    
  })
});

app.get('/charge', function(req, res) {
  fs.readFile('views/charge.html', function(err,data){
    res.writeHead(200, {'Context-Type':'text/html'});
    res.end(data);    
  })
});





app.post('/signup', async (req, res) => {
  const { id, password , inputName} = req.body;

  // Firestore에 저장
  await db.collection("MemberInformation").doc(id).set({
    pw: password,
    point: "1000",
    name: inputName
  });

  res.send('Signup successful');
});

app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  // Firestore에서 해당 아이디에 대한 회원 정보 가져오기
  const userDoc = await db.collection("MemberInformation").doc(id).get();

  // 아이디에 해당하는 회원 정보가 존재하는지 확인
  if (userDoc.exists) {
    const userData = userDoc.data();

    // 비밀번호 검증
    if (userData.pw === password) {
      console.log("로그인 성공");

      // 여기에서 userData.point 값을 읽어와서 클라이언트에 응답에 포함시킬 수 있습니다.
      res.send({
        point: userData.point,
      });
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
      res.status(401).send({});
    }
  } else {
    console.log("해당 아이디가 존재하지 않습니다.");
    res.status(404).send({});
  }


});



app.post('/product1', async (req, res) => {
  const { id, left_point } = req.body;

  var data = db.collection('MemberInformation').doc(id);

  // Modifying the field
  data.update({
    point: left_point
  })

  res.send({
    point: left_point,
  });

});



app.post('/charge', async (req, res) => {
  const { id, final_point } = req.body;

  var data = db.collection('MemberInformation').doc(id);

  // Modifying the field
  data.update({
    point: final_point
  })

  res.send({
    point: final_point,
  });

});




// 엔드포인트: Firestore에서 데이터를 가져와 응답
app.get('/getData', async (req, res) => {
  try {
    const data = await fetchDataFromFirestore(); // Firestore에서 데이터 가져오는 함수 호출
    res.json(data); // JSON 형태로 응답
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Firestore에서 데이터를 가져오는 함수
async function fetchDataFromFirestore() {
  const collectionRef = db.collection('MemberInformation'); // Firestore 컬렉션 지정
  const querySnapshot = await collectionRef.get(); 
  const data = [];

  querySnapshot.forEach((doc) => {
    // data.push(doc.data());
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
}























app.listen(8080, function () {
  console.log('서버가 포트 8080에서 실행 중입니다.');
});