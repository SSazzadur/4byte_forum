const Logo = () => {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 40C0 17.9086 17.9086 0 40 0H90C95.5228 0 100 4.47715 100 10V60C100 82.0914 82.0914 100 60 100H10C4.47716 100 0 95.5228 0 90V40Z"
                fill="url(#paint0_radial)"
            />
            <path
                d="M81.851 70.035H71.021V84H56.011V70.035H20.196V59.68L51.546 17.5H67.696L38.626 57.495H56.486V45.05H71.021V57.495H81.851V70.035Z"
                fill="black"
            />
            <defs>
                <radialGradient
                    id="paint0_radial"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(50 50) rotate(90) scale(50)"
                >
                    <stop stopColor="#FF6D6D" />
                    <stop offset="1" stopColor="#FF1057" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default Logo;
