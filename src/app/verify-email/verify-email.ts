import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.html',
  styleUrls: ['./verify-email.scss']
})
export class VerifyEmail implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const url = this.route.snapshot.queryParamMap.get('url');
    if (!url) {
      this.status = 'error';
      this.message = 'Enlace de verificación inválido.';
      return;
    }

    this.http.get(url, { withCredentials: true }).subscribe({
      next: () => {
        this.status = 'success';
        this.message = 'Email verificado correctamente. Ya puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: () => {
        this.status = 'error';
        this.message = 'El enlace de verificación es inválido o ha expirado.';
      }
    });
  }
}
