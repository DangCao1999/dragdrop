import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component';

import * as firebase from 'firebase';
const fieldValue = firebase.firestore.FieldValue
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  lists = [];

  constructor(public afs:AngularFirestore) {
   }

  ngOnInit(): void {
    this.afs.collection("board").doc("kdRn3TmzlPnlXH3rq8gN").snapshotChanges().subscribe((card)=>{
      this.lists = card.payload.get("tabs")
    })
  }

  async addList() {
    let cardRef = await this.afs.collection("cards").add({
    })
    await this.afs.collection("board").doc("kdRn3TmzlPnlXH3rq8gN").update({
      "tabs":fieldValue.arrayUnion(cardRef.id)
    })
    // var newList = new ListComponent();
  }
}
