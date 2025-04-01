
import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Layout>
      <Navbar />
      <Container className="flex flex-col items-center justify-center min-h-[70vh] py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-300 mb-8 text-center max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
            Return to Home
          </Button>
        </Link>
      </Container>
    </Layout>
  );
};

export default NotFound;
