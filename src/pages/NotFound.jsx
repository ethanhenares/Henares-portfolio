import { Link } from 'react-router-dom'
import BodyText from '../components/BodyText.jsx'
import Button from '../components/Button.jsx'
import Page from '../components/Page.jsx'
import PageTitle from '../components/PageTitle.jsx'

export default function NotFound() {
  return (
    <Page>
      <PageTitle>404</PageTitle>
      <BodyText>That page doesn't exist.</BodyText>
      <Button as={Link} to="/">
        Back to home
      </Button>
    </Page>
  )
}