const styles = {
    blueCircle: {
        animationDelay: '0.1s'
    },
    greenCircle: {
        animationDelay: '0.2s'
    },
    redCircle: {
        animationDelay: '0.3s'
    },
}

const Loader = () => {
    return (
        <div className="flex justify-center items-center max-h-full">
            <div className="bg-white flex space-x-2 p-3 rounded-full justify-center items-center">
                <div className="bg-blue-600 p-2 w-4 h-2 rounded-full animate-bounce " style={styles.blueCircle}></div>
                <div className="bg-green-600 p-2 w-4 h-2 rounded-full animate-bounce " style={styles.greenCircle}></div>
                <div className="bg-red-600 p-2 w-4 h-2 rounded-full animate-bounce " style={styles.redCircle}></div>
            </div>
        </div>

    );
};

export default Loader;