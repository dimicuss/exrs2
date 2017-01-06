(() => {
	class Header extends React.Component {
		render() {
			const
				uiTest = /Trident/i,
				_class  = uiTest.test(navigator.userAgent) ? ' _ie': ''

			return <header className={`header${ _class }`}></header>
		}
	}

	function EmptyField () {
		return <div className="empty-field"></div>
	}

	function Root(options) {
		return <div className="root">{options.children}</div>
	}

	class MainContent extends React.Component {
		render() {
			return <main className="main-content">
				<div className="container">
					<h1 className="main-content__h1">ЗАГОЛОВОК ЗДЕСЬ</h1>
					<div className="main-content__border"></div>
					<p className="main-content__p">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
						occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</main>
		}
	}

	window.onload = () => {
		ReactDOM.render(
			<Root>
				<Header/>
				<EmptyField/>
				<MainContent/>
			</Root>,
			document.querySelector('#react-entry'))
	}
})()

