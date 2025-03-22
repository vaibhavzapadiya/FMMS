import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../Service/report.service';
import {json2csv} from 'json-2-csv'
import {Chart, registerables, PieController, ArcElement, Tooltip, Legend, Title} from 'chart.js';
declare var bootstrap: any; // Required for Bootstrap Modal

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  filterForm!: FormGroup;
  reportData: any[]=[] 
  modal:any

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    Chart.register(PieController, ArcElement, Tooltip, Legend, Title, ...registerables); // Register pie chart related items.
  }
 
  ngOnInit(): void {
    // Initialize filter form
this.filterForm = this.fb.group({
      employeeId: [null],
      priorityID: [null],
      statusID: [null],
      issueId: [null],
      startDate: [null],
      endDate: [null],
      includeDeleted: [false]
    });
    
  }
 
  // Submit the filter form
  applyFilter() {
    const filterData = this.filterForm.value;
 
    
    this.reportService.getFilteredReport(filterData).subscribe({
      next: (response:any) => {
        this.reportData = response;
    
        console.log(this.reportData);
        
        console.log('Filtered Report Data:', this.reportData);
        this.modal.hide()
      },
      error: (error:any) => {
        console.error('Error fetching report data:', error);
      }
    });
  }
 

  resetForm() {
    this.filterForm.reset() ;
  }

  openModal() {


     this.modal = new bootstrap.Modal(document.getElementById('reportModal'));

    this.modal.show();
  }

  downloadData() {
    console.log(this.reportData);
    console.log(this.reportData[0]);
    
    
    const data = this.reportData;
    const csvData = json2csv(data as unknown as object[])
    let blob = new Blob([csvData], { type: 'application/vnd.ms-excel' })
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = Date.now().toString();
    a.click();
  }

  createStatusChart(statusSummary: any[]) {
    const labels = statusSummary.map((item) => item.statusName);
    const data = statusSummary.map((item) => item.statusCount);
    const colors = [
      'rgba(54, 162, 235, 0.8)', // Blue
      'rgba(255, 206, 86, 0.8)', // Yellow
      'rgba(255, 99, 132, 0.8)', // Red
    ];

    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie', // Or 'bar'
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Request Status',
            data: data,
            backgroundColor: colors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Request Status Summary',
          },
        },
      },
    });
  }
  createTechnicianPerformanceChart(technicianPerformance: any[]) {
    const labels = technicianPerformance.map((item) => item.technicianName);
    const data = technicianPerformance.map((item) => item.resolvedRequests);

    const ctx = document.getElementById('technicianChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Resolved Requests',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Technician Performance',
          },
        },
      },
    });
  }
}