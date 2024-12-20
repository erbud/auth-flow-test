import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="p-4">
      <h1 className="h1">Política de cookies</h1>
      <h2>Información sobre cookies</h2>
      <p>
        Debido a la entrada en vigor de la referente modificación de la «Ley de Servicios de la Sociedad de la Información» (LSSICE) establecida por el Real Decreto 13/2012, es de obligación obtener el consentimiento expreso del usuario de todas las páginas web que usan cookies prescindibles, antes de que este navegue por ellas.
      </p>
      <h2>¿Qué son las cookies?</h2>
      <p>
        Las cookies y otras tecnologías similares tales como local shared objects, flash cookies o píxeles, son herramientas empleadas por los servidores Web para almacenar y recuperar información acerca de sus visitantes, así como para ofrecer un correcto funcionamiento del sitio.
      </p>
      <p>
        Mediante el uso de estos dispositivos se permite al servidor Web recordar algunos datos concernientes al usuario, como sus preferencias para la visualización de las páginas de ese servidor, nombre y contraseña, productos que más le interesan, etc.
      </p>
      <h2>Cookies afectadas por la normativa y cookies exceptuadas</h2>
      <p>
        Según la directiva de la UE, las cookies que requieren el consentimiento informado por parte del usuario son las cookies de analítica y las de publicidad y afiliación, quedando exceptuadas las de carácter técnico y las necesarias para el funcionamiento del sitio web o la prestación de servicios expresamente solicitados por el usuario.
      </p>
      <h2>Tipos de cookies</h2>
      <h3>Según la finalidad</h3>
      <ul>
        <li>
          <strong>Cookies técnicas y funcionales</strong>: son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan.
        </li>
        <li>
          <strong>Cookies analíticas</strong>: son aquellas que permiten al responsable de las mismas el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas. La información recogida mediante este tipo de cookies se utiliza en la medición de la actividad de los sitios web, aplicación o plataforma y para la elaboración de perfiles de navegación de los usuarios de dichos sitios, aplicaciones y plataformas, con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los usuarios del servicio.
        </li>
        <li>
          <strong>Cookies publicitarias</strong>: son aquellas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado en base a criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.
        </li>
        <li>
          <strong>Cookies de publicidad comportamental</strong>: recogen información sobre las preferencias y elecciones personales del usuario (retargeting) para permitir la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado.
        </li>
        <li>
          <strong>Cookies sociales</strong>: son establecidas por las plataformas de redes sociales en los servicios para permitirle compartir contenido con sus amigos y redes. Las plataformas de medios sociales tienen la capacidad de rastrear su actividad en línea fuera de los Servicios. Esto puede afectar al contenido y los mensajes que ve en otros servicios que visita.
        </li>
        <li>
          <strong>Cookies de afiliados</strong>: permiten hacer un seguimiento de las visitas procedentes de otras webs, con las que el sitio web establece un contrato de afiliación (empresas de afiliación).
        </li>
        <li>
          <strong>Cookies de seguridad</strong>: almacenan información cifrada para evitar que los datos guardados en ellas sean vulnerables a ataques maliciosos de terceros.
        </li>
      </ul>
      <h3>Según la propiedad</h3>
      <ul>
        <li>
          <strong>Cookies propias</strong>: son aquellas que se envían al equipo terminal del usuario desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado por el usuario.
        </li>
        <li>
          <strong>Cookies de terceros</strong>: son aquellas que se envían al equipo terminal del usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos través de las cookies.
        </li>
      </ul>
      <h3>Según el plazo de conservación</h3>
      <ul>
        <li>
          <strong>Cookies de sesión</strong>: son un tipo de cookies diseñadas para recabar y almacenar datos mientras el usuario accede a una página web.
        </li>
        <li>
          <strong>Cookies persistentes</strong>: son un tipo de cookies en el que los datos siguen almacenados en el terminal y pueden ser accedidos y tratados durante un período definido por el responsable de la cookie, y que puede ir de unos minutos a varios años
        </li>
      </ul>
      <h2>Tratamiento de datos personales</h2>
      <p>
        <strong>deCompeti.com</strong> es el Responsable del tratamiento de los datos personales del Interesado y le informa de que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril de 2016 (GDPR), por lo que se le facilita la siguiente información del tratamiento.
      </p>
      <p>
        <strong>Fines del tratamiento</strong> según se especifica en el apartado <Link href="/">Mis cookies</Link> que se utilizan en este sitio web.
      </p>
      <p>
        <strong>Legitimación del tratamiento</strong> por consentimiento del interesado (art. 6.1 GDPR).
      </p>
      <p>
        <strong>Criterios de conservación de los datos</strong> según se especifica en el apartado <Link href="/">Mis cookies</Link> que se utilizan en este sitio web.
      </p>
      <p>
        No se <strong>comunicarán los datos</strong> a terceros, excepto en cookies de propiedad de terceros o por obligación legal.
      </p>
      <h3>
        Derechos que asisten al Interesado
      </h3>
      <ul>
        <li>
          Derecho a retirar el consentimiento en cualquier momento.
        </li>
        <li>
          Derecho de acceso, rectificación, portabilidad y supresión de sus datos, y de limitación u oposición a su tratamiento.
        </li>
        <li>
        Derecho a presentar una reclamación ante la Autoridad de control (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.
        </li>
      </ul>
      <h2>Datos de contacto para ejercer sus derechos</h2>
      <p>
        E–mail: decompeti [punto] app [arroba] gmail [punto] com
      </p>
    </div>
  );
}