
import Layout from '@/components/Layout';
import AdminDataViewer from '@/components/AdminDataViewer';

const AdminPanelPage = () => {
  return (
    <Layout>
      <div className="page-container bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 animate-slide-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Панель администратора</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Управление данными сайта
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <AdminDataViewer />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanelPage;
