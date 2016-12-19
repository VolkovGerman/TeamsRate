import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() page: string;

  constructor(private route: ActivatedRoute, private router: Router) {    
  }

  ngOnInit() {
  }

  logout() {
      localStorage.removeItem('user');

      this.router.navigate(['/']);
  }

}
 