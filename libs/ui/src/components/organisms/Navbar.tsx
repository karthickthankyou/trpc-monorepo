import { Brand } from '../molecules/Brand'
import { Container } from '../atoms/container'
import { Sidebar } from './Sidebar'

export interface INavbarProps {}

export const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full h-12 border-2 border-white border-y bg-white/40 backdrop-blur backdrop-filter">
      <Container>
        <div className="flex items-center justify-between">
          <Brand /> <Sidebar />
        </div>
      </Container>
    </nav>
  )
}
