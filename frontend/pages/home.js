var ctx = document.getElementById('financasChart').getContext('2d');
var financasChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Receitas', 'Despesas'], // Eixos X
    datasets: [{
      label: 'Valor (R$)',
      data: [2000, 1500], // Dados de receitas e despesas
      backgroundColor: ['rgba(40, 167, 69, 0.6)', 'rgba(220, 53, 69, 0.6)'], // Cores de cada barra
      borderColor: ['rgba(40, 167, 69, 1)', 'rgba(220, 53, 69, 1)'], // Cores da borda
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true, // Iniciar o gráfico no zero
        ticks: {
          stepSize: 500, // Incrementos do gráfico
          callback: function(value) {
            return 'R$ ' + value.toLocaleString(); // Formatação monetária
          }
        }
      }
    }
  }
});