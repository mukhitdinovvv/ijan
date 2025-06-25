
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-lavender/30 to-white">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
          <p className="text-2xl text-gray-700 mb-8">
            Упс! Страница не найдена
          </p>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Страница, которую вы ищете, не существует или была перемещена.
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/80 text-white">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
