import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServicoService {
  private apiUrl = 'https://localhost:7299/api/ItemServico';

  constructor(private http: HttpClient) {}

  listarServicos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
