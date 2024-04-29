import { Footer } from 'flowbite-react';
import 'flowbite/dist/flowbite.css';
import {
    BsDribbble,
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTwitter,
} from 'react-icons/bs';

const colorSocials = {
    color: 'white',
};
const FooterMovie = () => {
    return (
        <Footer
            container
            bgDark
            style={{
                position: 'relative',
                bottom: '0px',
                height: '100%',
                width: '100%',
                borderRadius: '0px',
                display: 'block',
            }}
        >
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                        <Footer.Brand
                            href="https://github.com/DenisFR2727"
                            src="https://seeklogo.com/images/G/github-logo-45146A3FBE-seeklogo.com.png"
                            alt="Flowbite Logo"
                            name="By DenisFR2727"
                            style={{
                                background: 'white',
                                padding: '10px',
                                borderRadius: '5px',
                                textDecoration: 'none',
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6"></div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright
                        href="#"
                        by="The Movies DB™"
                        year={2024}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon
                            style={colorSocials}
                            href="#"
                            icon={BsFacebook}
                        />
                        <Footer.Icon
                            style={colorSocials}
                            href="#"
                            icon={BsInstagram}
                        />
                        <Footer.Icon
                            style={colorSocials}
                            href="#"
                            icon={BsTwitter}
                        />
                        <Footer.Icon
                            style={colorSocials}
                            href="https://github.com/DenisFR2727"
                            icon={BsGithub}
                        />
                        <Footer.Icon
                            style={colorSocials}
                            href="#"
                            icon={BsDribbble}
                        />
                    </div>
                </div>
            </div>
        </Footer>
    );
};
export default FooterMovie;
