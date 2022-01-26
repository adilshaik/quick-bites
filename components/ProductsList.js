import Image from 'next/image';
import Link from 'next/link';
const ProductsList = ({ products }) => {
  return (
    <div id='products' className='bg-white'>
      <div className='max-w-2xl mx-auto px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 '>
        <div className='mt-5 mb-14'>
          <h2 className='text-4xl text-center font-extrabold tracking-tight text-gray-900'>
            Customers also purchased
          </h2>
          <p className='w-3/4 mx-auto text-center my-5 text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            quaerat alias aspernatur non, recusandae ullam dolorum voluptatum
            facilis. Pariatur, recusandae.
          </p>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6'>
          {products.map((product) => (
            <Link key={product._id} href={`products/${product._id}`} passHref>
              <div className='p-2 group relative'>
                <div className='w-full pt-2 min-h-72 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-72 lg:aspect-none'>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className='mt-2 w-full h-full object-center object-cover'
                  />
                </div>
                <div className='flex flex-col items-center'>
                  <div className='w-full px-2 flex justify-between'>
                    <h3 className='text-lg font-bold text-red-700'>
                      <a>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.title}
                      </a>
                    </h3>
                    <p className='text-md my-1 font-bold text-gray-600'>
                      Rs.{product.prices[0]}
                    </p>
                  </div>
                </div>
                <p className='text-sm text-left px-2'>{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
