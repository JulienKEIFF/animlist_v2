<template>
  <div class="anime-card">
    <h1>{{title}}</h1>
    <h2>{{episode}} épisode</h2>
    <p>{{descr}} </p>
    <div class="button">
      <span @click="likeFunction" class="mdi mdi-heart" :class="like ? 'like' : 'no-like'"></span>
      <span @click="viewFunction" :class="view ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></span>
    </div>
  </div>
</template>

<script>
import {db} from '../../firebaseConfig'
const fb = require('../../firebaseConfig')

  export default {
    name: 'AnimeCard',
    props: {
      title: null,
      episode: null,
      descr: null,
      id: null,
    },
    data() {
      return {
        like: false,
        view: false
      }
    },
    methods: {
      likeFunction(){
        this.like = !this.like
        let idItem = this.id
        db.runTransaction(function(transaction){
          return transaction.get(db.collection('users').doc(fb.auth.currentUser.uid))
          .then(function(likeDoc){
            if(likeDoc.data().animeLike.includes(idItem)){
              let index = likeDoc.data().animeLike.indexOf(idItem)
              let newArray = likeDoc.data().animeLike.slice()
              newArray.splice(index, 1)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {animeLike: newArray})
            }else{
              let itemLike = likeDoc.data().animeLike.slice()
              itemLike.push(idItem)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {animeLike: itemLike})
            }
          })
        })
      },
      viewFunction(){
        this.view = !this.view
        let idItem = this.id
        db.runTransaction(function(transaction){
          
          return transaction.get(db.collection('users').doc(fb.auth.currentUser.uid))
          .then(function(viewDoc){
            if(viewDoc.data().animeView.includes(idItem)){
              let index = viewDoc.data().animeView.indexOf(idItem)
              let newArray = viewDoc.data().animeView.slice()
              newArray.splice(index, 1)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {animeView: newArray})
            }else{
              let itemView = viewDoc.data().animeView.slice()
              itemView.push(idItem)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {animeView: itemView})
            }
          })
        })
      }
    },
    mounted: async function() {
      let likeUser = await db.collection('users').doc(fb.auth.currentUser.uid).get()
        .then(doc => {
          return doc.data().animeLike
        })
      if(likeUser.includes(this.id)){
        this.like = true
      }else{
        this.like = false
      }
      let viewUser = await db.collection('users').doc(fb.auth.currentUser.uid).get()
        .then(doc => {
          return doc.data().animeView
        })
      if(viewUser.includes(this.id)){
        this.view = true
      }else{
        this.view = false
      }
    }
  }
</script>

<style scoped lang="scss">
.anime-card{
  position: relative;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.911);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.253);
  h1{
    margin: 0;
    text-transform: uppercase;
  }
  .mdi{
    position: absolute;
    font-size: 30px;
    transition-duration: 0.2s;
  }
  .mdi.no-like{
    right: 40px;
    top: 25px;
    color: rgb(231, 231, 231);
  }
  .mdi.like{
    right: 40px;
    top: 25px;
    color: #ef534f;
  }
  .mdi.mdi-eye{
    right: 40px;
    top: 65px;
  }
  .mdi.mdi-eye-off{
    right: 40px;
    top: 65px;
  }
}
</style>
