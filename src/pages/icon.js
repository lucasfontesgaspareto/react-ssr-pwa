import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default class Icon extends React.PureComponent {
  state = {
    isLoaded: false,
  }

  async loadIcon() {
    try {
      const icon = await fetch(`/_icon/${this.props.match.params.name}`).then(
        res => res.json()
      )
      this.library.add(icon)
    } catch (error) {
      // console.error('loading error:', error)
    }
    this.setState({ isLoaded: true })
  }

  async componentDidMount() {
    const { library } = await import('@fortawesome/fontawesome-svg-core')
    const { FontAwesomeIcon } = await import('@fortawesome/react-fontawesome')
    this.library = library
    this.FontAwesomeIcon = FontAwesomeIcon
    await this.loadIcon()
  }

  componentDidUpdate(props) {
    // If the component is rendered and the name has changed - update
    // This happens when we click the link that leads to the same page for example
    if (this.props.match.params.name !== props.match.params.name) {
      this.setState({ isLoaded: false })
      this.loadIcon()
    }
  }

  render() {
    const name = this.props.match.params.name
    return (
      <>
        <Helmet>
          <title> Icon {name}</title>
          <meta name="description" content={`Icon ${name}`} />
        </Helmet>
        <div className="App">
          <header className="App-header">
            {this.state.isLoaded && (
              <this.FontAwesomeIcon icon={name} prefix="fas" size="10x" />
            )}
            <h1>Icon {name}</h1>
            <Link to="/icon/circle" className="App-link">
              Circle
            </Link>
            <br />
            <Link to="/icon/home" className="App-link">
              Home
            </Link>
          </header>
        </div>
      </>
    )
  }
}
