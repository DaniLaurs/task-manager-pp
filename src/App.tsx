import { Header } from './components/header';
import { PageContainer } from './components/page-container';
import { PageContent } from './components/page-content';


export function App() {
  return (
    <PageContainer>
      <PageContent>
       <Header />
      </PageContent>
    </PageContainer>
  );
}
