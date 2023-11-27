import { BaseLayout } from '@/ui/layout/layout';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <BaseLayout className="flex flex-col items-center justify-center rounded-md border border-gray-100 bg-white drop-shadow-sm">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-3xl font-bold">Welcome to the ChatterBox</h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec ultrices nisi, vel
          tempus felis. Nullam bibendum pulvinar mauris sed commod
        </p>
        <div className="flex flex-row items-center justify-center gap-4">
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="username"
          />
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
