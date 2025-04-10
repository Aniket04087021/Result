import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Result } from '../../models/result.model';
import { ResultService } from '../../services/result.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="bg-white shadow-lg rounded-lg">
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Results</h1>
          
          <!-- Search and Filter -->
          <div class="mb-6 flex justify-between items-center">
            <input 
              type="text" 
              [(ngModel)]="searchTerm"
              (input)="filterResults()"
              placeholder="Search by name..." 
              class="p-2 border rounded-lg w-64"
            >
          </div>

          <!-- Results Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-3 px-4 border-b text-left">Name</th>
                  <th class="py-3 px-4 border-b text-left">Position</th>
                  <th class="py-3 px-4 border-b text-left">Winning Amount</th>
                  <th class="py-3 px-4 border-b text-left">Event ID</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let result of filteredResults" class="hover:bg-gray-50">
                  <td class="py-3 px-4 border-b">{{result.name}}</td>
                  <td class="py-3 px-4 border-b">{{result.position}}</td>
                  <td class="py-3 px-4 border-b">₹{{result.winning_amount}}</td>
                  <td class="py-3 px-4 border-b">{{result.event_id}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- No Results Message -->
          <div *ngIf="filteredResults.length === 0" class="text-center py-4 text-gray-600">
            No results found.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #f3f4f6;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      padding: 12px 15px;
      border: 1px solid #e5e7eb;
      text-align: left;
    }

    th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #374151;
    }

    tr:nth-child(even) {
      background-color: #f3f4f6;
    }

    tr:hover {
      background-color: #e2e8f0;
    }

    input {
      border-color: #e5e7eb;
      outline: none;
    }

    input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
  `]
})
export class ResultComponent implements OnInit {
  results: Result[] = [];
  filteredResults: Result[] = [];
  searchTerm: string = '';

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    this.resultService.getResults().subscribe({
      next: (data) => {
        this.results = data;
        this.filteredResults = data;
      },
      error: (error) => {
        console.error('Error loading results:', error);
      }
    });
  }

  filterResults(): void {
    if (!this.searchTerm) {
      this.filteredResults = this.results;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredResults = this.results.filter(result =>
      result.name.toLowerCase().includes(searchTermLower)
    );
  }
} 