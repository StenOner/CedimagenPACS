import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-email',
  templateUrl: '../profile/profile.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {
  public route:string;

  constructor(
    private router:Router
  ){
    this.route = router.url;
  }

  ngOnInit(): void {
  }

}
