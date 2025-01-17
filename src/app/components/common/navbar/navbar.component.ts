import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.setTimeout(() => {
      sessionStorage.setItem('renderRouteAnimation', 'true');
    }, 100);

    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
          $('#top').fadeIn();
        } else {
          $('#top').fadeOut();
        }
      });

      $('#top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
      });

      if ($(window).scrollTop() === 0) {
        document.getElementById('foss_logo').style.opacity = '0%';
      } else {
        document.getElementById('foss_logo').style.opacity = '100%';
      }
    });

    this.refreshNavLinks();
    $(window).on('resize', () => {
      this.refreshNavLinks();
    });
  }

  @HostListener('document:scroll')
  scrollFunction() {
    if ($(window).scrollTop() > 60) {
      $('#logo').fadeOut();
      document.getElementById('foss_logo').style.opacity = '100%';
      $('.navbar').addClass(['navbar-fixed', 'shadow']);
    } else {
      $('#logo').fadeIn();
      document.getElementById('foss_logo').style.opacity = '0%';
      $('.navbar').removeClass(['navbar-fixed', 'shadow']);
    }
  }

  refreshNavLinks() {
    const mediaQuery = window.matchMedia('(max-width: 992px)');
    const navElements = document.querySelectorAll('.nav-link');

    navElements.forEach((element) => {
      if (mediaQuery.matches) {
        element.setAttribute('data-bs-toggle', 'collapse');
        element.setAttribute('data-bs-target', '#navbarNavDropdown');
      } else {
        element.removeAttribute('data-bs-toggle');
        element.removeAttribute('data-bs-target');
      }
    });
  }
}
