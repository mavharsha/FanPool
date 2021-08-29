interface Props {
  message: string;
  title: string;
}

function HeroBanner(props: Props) {
  return (
    <>
      <div className="bg-gradient-to-b from-green-600 to-green-500 rounded-md mt-4">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-indigo-100 sm:text-4xl">
            <span className="block">{props.title}</span>
            <span className="block text-opacity-60 text-white text-right text-lg mt-2">{props.message}</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-900">
                OnBoard to FanPool
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-gray-200 hover:bg-grey-700">
                Creator Pools
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroBanner;