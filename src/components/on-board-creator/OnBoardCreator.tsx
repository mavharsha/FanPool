import { useFormik } from 'formik';

function OnBoardCreator() {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
                <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} className="appearance-none relative block w-full mt-2 mb-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm" placeholder="Creator name" />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-900">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default OnBoardCreator;


/*
<form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="name"
                  name="Name"
                  className="rounded text-pink-500"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <button type="submit">Submit</button>
              </form>



              <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={formik.handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>





              */