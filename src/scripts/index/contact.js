$('#contact form').on('submit', function(e) {

    e.preventDefault();
        
    const apellidos = $('.contact-form-last_name').val();
    const email = $('.contact-form-email').val();
    const organizacion = $('input[placeholder="Organización"]').val();
    const nombre = $('.contact-form-first_name').val();
    const telefono = $('.contact-form-phone').val();
    const buscando = $('.contact-form-looking').val();
    const mensaje = $('.contact-form-mess').val();

    const body = `
        Hello, my name is ${nombre} ${apellidos}! I'm from the company ${organizacion}, and I'm looking for ${buscando}

        ${mensaje}

        You can contact me by e-mail (${email}) or by phone (${telefono}).

        ${nombre} ${apellidos}
    `;
  
    window.location.href = `mailto:nyeri.clan@gmail.com?subject=${encodeURIComponent(`${buscando}`)}&body=${encodeURIComponent(body)}`;
        
});