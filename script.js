document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Progress bar logic
    const progressBar = document.getElementById('progress');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // Modal Logic
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    const modalData = {
        'exploratorio': {
            title: 'Enfoque Exploratorio',
            body: '<p>En la fase exploratoria, la prioridad es el descubrimiento. <br><br><strong>Herramientas sugeridas:</strong><ul><li><strong>Pandas:</strong> Fundamental para la manipulación y limpieza de grandes volúmenes de datos.</li><li><strong>Matplotlib & Seaborn:</strong> Ideales para crear visualizaciones rápidas que permiten encontrar correlaciones, distribuciones y valores atípicos.</li></ul></p>'
        },
        'explicativo': {
            title: 'Enfoque Explicativo',
            body: '<p>La fase explicativa se centra en la persuasión y la claridad. <br><br><strong>Herramientas sugeridas:</strong><ul><li><strong>Plotly:</strong> Proporciona interactividad fluida, permitiendo que la audiencia explore los datos bajo un marco predefinido.</li><li><strong>Altair:</strong> Excelente para visualizaciones estadísticas declarativas, facilitando la creación de gráficos complejos con poco código.</li></ul></p>'
        },
        'paso3': {
            title: 'Eliminación de Ruido',
            body: '<p>Reducir la carga cognitiva es vital para el éxito de una historia de datos. <br><br><strong>Consejos prácticos:</strong><ul><li>Elimina bordes innecesarios y líneas de cuadrícula pesadas.</li><li>Evita el exceso de colores; usa color solo para destacar el punto clave.</li><li>Simplifica las etiquetas y utiliza el texto directamente cerca de los datos.</li></ul></p>'
        },
        'audiencia': {
            title: 'Conoce a tu Audiencia',
            body: '<p>Antes de diseñar, pregunta: ¿Qué saben sobre este tema? ¿Qué decisiones toman? <br><br>Un CEO necesita la "big picture", mientras que un analista técnico querrá ver la metodología y el detalle granular.</p>'
        },
        'objetivo': {
            title: 'Punto de Acción',
            body: '<p>Toda visualización debe responder a la pregunta: ¿Y ahora qué? <br><br>Asegúrate de que tu "Call to Action" sea claro e inequívoco después de presentar la evidencia de los datos.</p>'
        },
        'paso1': {
            title: 'Domina el Contexto',
            body: '<p>El contexto lo es todo. Entender el problema de negocio nos permite filtrar qué datos son realmente relevantes y cuáles son mera curiosidad.</p>'
        },
        'paso2': {
            title: 'Selecciona el Medio',
            body: '<p>No todos los gráficos sirven para todo. Usa barras para comparaciones, líneas para tendencias temporales y evita los gráficos de pastel para datos complejos.</p>'
        },
        'paso4': {
            title: 'Dirige la Atención',
            body: '<p>Usa atributos pre-atentivos como el tamaño, el color intenso o la posición para guiar el ojo hacia el insight que quieres comunicar de inmediato.</p>'
        }
    };

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.getAttribute('data-modal');
            if (modalData[type]) {
                modalTitle.innerText = modalData[type].title;
                modalBody.innerHTML = modalData[type].body;
                modalOverlay.classList.add('active');
            }
        });

        // Tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });
});
