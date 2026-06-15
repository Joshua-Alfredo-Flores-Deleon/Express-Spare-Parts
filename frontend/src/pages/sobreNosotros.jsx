import React from 'react';

const SobreNosotros = () => {
  // Estilos del diseño institucional de Express Spare Parts
  const paginaEstilo = {
    backgroundColor: '#f3f4f6', // Fondo gris claro para que contrasten las tarjetas
    minHeight: '100vh',
    width: '100%',
    paddingBottom: '4rem',
    fontFamily: '"Helvetica Neue", Arial, sans-serif'
  };

  const headerEstilo = {
    backgroundColor: '#1e3d8a',
    color: '#ffffff',
    textAlign: 'center',
    padding: '3rem 1rem',
    marginBottom: '2rem',
    boxShadow: '10px 10px rgba(0, 0, 0, 0.1)',
    marginRight: '50px',
    marginLeft: '50px',
    marginTop: '50px',
    borderRadius: '2rem'
  };

  const contenedorEstilo = {
    backgroundColor: '#1e3d8a',
    borderRadius: '2rem',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    color: '#ffffff',
    boxShadow: '10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    marginBottom: '2rem'
  };

  const gridEstilo = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  return (
    <div style={paginaEstilo}>
      
      {/* Encabezado de la Página */}
      <header style={headerEstilo}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Conoce Nuestra Empresa</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '0.5rem' }}>Express Spare Parts</p>
      </header>

      {/* Cuerpo de la página */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* SECCIÓN: ¿Quiénes Somos? */}
        <section style={contenedorEstilo}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 'bold', marginBottom: '1.25rem', letterSpacing: '0.5px' }}>
            ¿Quienes Somos?
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '1000px', margin: '0 auto', fontWeight: '300' }}>
            Express Spare Parts es una empresa dedicada a la distribución y venta de repuestos internos de vehículos.
            La empresa opera mediante una plataforma digital propia que integra un sistema de comercio electrónico, 
            permitiendo a los usuarios gestionar sus adquisiciones de manera remota con una disponibilidad de servicio 
            de 24 horas. El modelo de negocio se fundamenta en la optimización de la logística de última milla, ofreciendo
            un servicio de entrega a domicilio que pone en esencial la entrega de pedidos.
          </p>
        </section>

        {/* SECCIÓN INTERMEDIA: Misión, Objetivo y Visión (3 Columnas) */}
        <div style={gridEstilo}>
          
          {/* Tarjeta: Misión */}
          <section style={contenedorEstilo}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Misión</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', fontWeight: '300', textAlign: 'justify' }}>
              Express Spare Part busca ser la empresa líder en ofrecer productos de repuestos para carros 
              en la región, haciéndonos denotar por la rapidez y la calidad en la que brindamos nuestros 
              productos a nuestros clientes, Express Spare Parts no busca ser una empresa distribuidora de
              repuestos para vehículos mas, si no la mejor opción para personas en situación de emergencia
              que busquen reemplazar partes en mal estado de sus vehículos.
            </p>
          </section>

          {/* Tarjeta: Objetivo */}
          <section style={contenedorEstilo}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Objetivo</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', fontWeight: '300', textAlign: 'justify' }}>
              Nuestra plataforma revoluciona la adquisición de repuestos al fusionar la agilidad del comercio electrónico 
              con la precisión de la asistencia humana local. Resolvemos la urgencia de quienes enfrentan una avería 
              mecánica conectándolos con un inventario global y distribuidores estratégicos, pero con el respaldo vital 
              de nuestros expertos en terreno. Estos profesionales eliminan la incertidumbre técnica al validar cada 
              compatibilidad en tiempo real.
            </p>
          </section>

          {/* Tarjeta: Visión */}
          <section style={contenedorEstilo}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Visión</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', fontWeight: '300', textAlign: 'justify' }}>
              Ser la empresa líder y referente en la región en repuestos para vehículos, reconocida por nuestra rapidez, 
              calidad y confiabilidad, convirtiéndonos en la primera y mejor opción para clientes que enfrentan situaciones 
              de emergencia, garantizando soluciones inmediatas que mantengan sus vehículos en óptimas condiciones y les 
              permitan continuar su camino con seguridad y tranquilidad.
            </p>
          </section>
        </div>

        {/* SECCIÓN: Nuestra Historia */}
        <section style={contenedorEstilo}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 'bold', marginBottom: '1.25rem', letterSpacing: '0.5px' }}>
            Nuestra Historia
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '1000px', margin: '0 auto', fontWeight: '300' }}>
            Durante inicios de 2026, nos reunimos como grupo de desarolladores de software y tuvimos la idea de desarrollar 
            Express Spare Parts como una empresa de venta de partes vehiculares regional en pequeña escala donde brindábamos 
            nuestros servicios a través de un sitio web el cual tras meses de esfuerzo logramos finalizarlo y pusimos en marcha 
            una pequeña sucursal en San Salvador, a finales de 2026, Express Spare Parts mantuvo desde sus inicios el enfoque 
            de brindar a sus consumidores un servicio de distribución de partes vehiculares de forma express y de calidad, 
            haciendonos la mejor opción en ocasiones como emergencias, con el tiempo y gracias a el mantenimiento de nuestro 
            enfoque Express Spare Parts fue creciendo mas de lo que habíamos previsto, siendo nuestra segunda sucursal inagurada 
            en La Libertad a finales de 2027 hasta llegar a tener múltiples sucursales abarcando todo El Salvador, con actuales 
            planes de expansión hacia otros países de CentroAmerica y el caribe, siendo Guatemala nuestra próxima expansion.
          </p>
        </section>

      </main>
    </div>
  );
};

export default SobreNosotros;