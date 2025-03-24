import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../Shared/Components/navbar/navbar.component";
import { TokenService } from '../../../Shared/Services/TokenService/token.service';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../Services/dashboard.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../reports/Service/report.service';
import { Chart, registerables, PieController, ArcElement, Tooltip, Legend, Title } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  currentuserroleid!: number | null
  maintenancecount: any[] = []
  workordercount: any[] = []
  reportdata: [] = []
  data = {
    employeeId: null,
    priorityID: null,
    statusID: null,
    issueId: null,
    startDate: null,
    endDate: null,
    includeDeleted: false
  }
  constructor(private service: DashboardService, private tokenservice: TokenService) {
    Chart.register(PieController, ArcElement, Tooltip, Legend, Title, ...registerables); // Register pie chart related items.
    this.currentuserroleid = this.tokenservice.getEmployeeRoleId();
  }
  ngOnInit(): void {

    this.loadCountdata()




  }



  loadCountdata() {

    forkJoin({
      maintenancecountdata: this.service.getallmaintenancerequestcount(),
      workordercountdata: this.service.getallworkorderCount(),
    }).subscribe({
      next: (res: any) => {
        this.maintenancecount = res.maintenancecountdata;
        this.workordercount = res.workordercountdata;
        this.createStatusChart(this.maintenancecount);
        this.createStatusChartForWorkOrder(this.workordercount);
      }

    });


  }
  createStatusChart(statusSummary: any[]) {
    console.log(statusSummary);
    
    const labels = statusSummary.map((item) => item.statusName) ;
    const data = statusSummary.map((item) => item.requestCount);
    const colors = [
      'rgba(255, 206, 86, 0.8)', // Yellow
      'rgba(54, 162, 235, 0.8)', // Blue
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

  createStatusChartForWorkOrder(workordercount: any[]) {


    const labels = workordercount.map((item) => item.statusName);
    const data = workordercount.map((item) => item.workOrderCount);

    
    const colors = [
      'rgba(255, 206, 86, 0.8)', // Yellow
      'rgba(54, 162, 235, 0.8)', // Blue
      'rgba(255, 99, 132, 0.8)', // Red
    ];

    const ctx = document.getElementById('statusChartForWorkOrder') as HTMLCanvasElement;

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
            text: 'Work Order Status Summary',
          },
        },
      },
    });
  }
  getButtonColor(index: number): string {
    const colors = [
      'rgba(255, 206, 86, 0.8)', // Yellow
      'rgba(54, 162, 235, 0.8)', // Blue
  
      'rgba(255, 99, 132, 0.8)', // Red
      
    ];

    return colors[index-1]; 
  }

  

}
