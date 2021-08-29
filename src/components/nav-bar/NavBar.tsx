import Logo from "../logo";
import WalletButton from "../wallet-button";


interface Props {
	account: string
	onAccountAdded: (account: string) => void;
}

function NavBar(props: Props) {
	/* 
	const activeItem = "py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold";
	const inActiveItem = "py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300";
	*/

    return(
        <>
        	<nav className="bg-white shadow-lg rounded-b-md">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div>
							<span className="flex items-center py-4 px-2" >
								<Logo/>
								<button className="font-semibold text-gray-500 text-2xl mr-2">FanPool</button>
								<Logo/>
							</span>
						</div>

					</div>
					<div className="hidden md:flex items-center space-x-3 ">
						<WalletButton account={props.account} onAccountAdded={ (account) => {console.log('account details', account); props.onAccountAdded(account)}} />
						<div className="flex space-x-2">
						<div className="relative w-12 h-12">
							<img alt='alt' className="rounded-full border border-gray-800 shadow-sm" src="https://randomuser.me/api/portraits/lego/7.jpg" />
						</div>
						</div>
						
					</div>
					<div className="md:hidden flex items-center">
						<button className="outline-none mobile-menu-button">
						<svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
							x-show="!showMenu"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>
			<div className="hidden mobile-menu">
				<ul className="">
					<li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
					<li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
					<li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
					<li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
				</ul>
			</div>
		</nav>
        </>
    );
}

export default NavBar;