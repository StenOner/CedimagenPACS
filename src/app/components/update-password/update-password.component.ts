import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: '../profile/profile.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  public route:string;

  constructor(
    private router:Router
  ){
    this.route = router.url;
  }

  ngOnInit(): void {
  }

}
