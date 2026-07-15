import { useState, useEffect } from 'react'
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { FiPackage, FiShoppingCart, FiTruck, FiDollarSign } from 'react-icons/fi'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const API = 'http://localhost:4000/api'

function Dashboard() {
  const [productCount, setProductCount] = useState(0)
  const [supplierCount, setSupplierCount] = useState(0)
  const [ventasCount, setVentasCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, suppRes, ventasRes] = await Promise.allSettled([
          axios.get(`${API}/product/count`),
          axios.get(`${API}/supplider`),
          axios.get(`${API}/venta`),
        ])

        if (prodRes.status === 'fulfilled') setProductCount(prodRes.value.data)
        if (suppRes.status === 'fulfilled') setSupplierCount(suppRes.value.data.length)
        if (ventasRes.status === 'fulfilled') setVentasCount(ventasRes.value.data.length)
      } catch (err) {
        console.error('Error loading dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const doughnutData = {
    labels: ['San Salvador', 'Santa Ana', 'San Miguel', 'Usulután', 'Cabañas'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        '#1B2A4A',
        '#2C5282',
        '#1A6B4A',
        '#4A90D9',
        '#9CA3AF',
      ],
      borderWidth: 0,
      cutout: '65%',
    }]
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 12, family: 'Inter' }
        }
      }
    }
  }

  const barData = {
    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    datasets: [
      {
        label: 'Fiscal',
        data: [4200, 3800, 5100, 4700, 6200, 5800],
        backgroundColor: '#1B2A4A',
        borderRadius: 4,
        barPercentage: 0.6,
      },
      {
        label: 'Efectivo',
        data: [3100, 4500, 3900, 5200, 4800, 6100],
        backgroundColor: '#22C55E',
        borderRadius: 4,
        barPercentage: 0.6,
      }
    ]
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: 'rect',
          font: { size: 11, family: 'Inter' }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, family: 'Inter' } }
      },
      y: {
        grid: { color: '#F3F4F6' },
        ticks: { font: { size: 11, family: 'Inter' } }
      }
    }
  }

  if (loading) {
    return <div className="loading-container">Cargando datos del dashboard...</div>
  }

  return (
    <>
      <div className="dashboard-kpis">
        <div className="kpi-card">
          <div className="kpi-header">
            <span>Productos Total</span>
            <div className="kpi-icon"><FiPackage /></div>
          </div>
          <div className="kpi-value">{productCount.toLocaleString()}</div>
          <div className="kpi-subtext">📈 +12% vs last month</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Pedidos Hoy</span>
            <div className="kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
              <FiShoppingCart />
            </div>
          </div>
          <div className="kpi-value">{ventasCount}</div>
          <div className="kpi-subtext">✅ 85% Fulfilled</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Active Suppliers</span>
            <div className="kpi-icon" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}>
              <FiTruck />
            </div>
          </div>
          <div className="kpi-value">{supplierCount}</div>
          <div className="kpi-subtext">Global & Local</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Inventory Value</span>
            <div className="kpi-icon" style={{ backgroundColor: 'rgba(74, 144, 217, 0.1)', color: '#4A90D9' }}>
              <FiDollarSign />
            </div>
          </div>
          <div className="kpi-value">$142,500</div>
          <div className="kpi-subtext">Updated 2m ago</div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Municipios por orden de compras</h3>
          <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#1B2A4A' }}>820</span>
            <br />
            <span style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</span>
          </div>
        </div>

        <div className="chart-card">
          <h3>Ingreso y Gastos</h3>
          <div style={{ height: '320px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
