import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

const ScheduleDemo = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Redirecting to Products</title>
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/schedule-demo' : ''} />
      </Helmet>
      <Navigate to="/products" replace />
    </>
  );
};

export default ScheduleDemo;
