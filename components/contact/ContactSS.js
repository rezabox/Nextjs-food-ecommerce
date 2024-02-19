import dynamic from 'next/dynamic';
import Form from './Form';
import Map from './Map';

function Contact() {
  const Map = dynamic(
    () => import('./Map'),
    {ssr: false}
  )

  return (
    <div>
       <section className="book_section layout_padding">
        <div className="container">
            <div className="heading_container">
                <h2>
                    تماس با ما
                </h2>
            </div>
            <div className="row">
                <div className="col-md-6">
                   <Form/>   
                </div>
                <div className="col-md-6">
                    <div className="map_container ">
                       <Map/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Contact;
