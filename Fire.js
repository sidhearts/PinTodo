import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWFKzxm7DEzLeIGVSvdzE50ZEAdwyOSoA",
  authDomain: "pintodo-94727.firebaseapp.com",
  databaseURL: "https://pintodo-94727.firebaseio.com",
  projectId: "pintodo-94727",
  storageBucket: "pintodo-94727.appspot.com",
  messagingSenderId: "587401718045",
  appId: "1:587401718045:web:6e51439cffd8a5e023d9f4",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  deleteList(list) {
    let ref = this.ref;

    ref.doc(list.id).delete();
  }

  // get userId() {
  //   return firebase.auth().currentUser.uid;
  // }

  get ref() {
    return firebase
    .firestore()
    .collection('users')
    .doc('Nh0RIfHwkUtZjOhHOoxQ')
    .collection("lists");
  }

  detach() {
      this.unsubscribe();
  }
}

export default Fire;
