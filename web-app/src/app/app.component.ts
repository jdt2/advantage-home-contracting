import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

export interface Item {
  imageURL: string;
  jobDesc: string;
  refer: string;
  status: string;
  timestamp: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  id: string;
  item: Observable<Item>;
  statuses = [
    "Submitted",
    "Reviewed",
    "Estimate",
    "Worked On",
    "Finished",
  ]
  selected: string;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
    console.log("Constructor");
    this.route.queryParams.subscribe(params => {
      this.id = params["id"];
      if (params["id"]) {
        this.item = db.collection("requests").doc<Item>(params["id"]).valueChanges();
        this.item.subscribe(val => {
          this.selected = val.status;
        })
      }
    })
  }

  submit() {
    this.db.collection("requests").doc(this.id).set({ status: this.selected }, { merge: true });
    alert("Submitted! New status: " + this.selected);
  }
}
