import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const fetchWorldWideData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
  return data;
};

const fetchCountriesData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  return data;
};

const fetchHistoricalData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data;
};

const Charts = () => {
  const {
    data: worldWideData,
    error: worldWideError,
    isLoading: isLoadingWorldWide
  } = useQuery({
    queryKey: ['worldWideData'],
    queryFn: fetchWorldWideData
  });

  const {
    data: countriesData,
    error: countriesError,
    isLoading: isLoadingCountries
  } = useQuery({
    queryKey: ['countriesData'],
    queryFn: fetchCountriesData
  });

  const {
    data: historicalData,
    error: historicalError,
    isLoading: isLoadingHistorical
  } = useQuery({
    queryKey: ['historicalData'],
    queryFn: fetchHistoricalData
  });

  if (isLoadingWorldWide || isLoadingCountries || isLoadingHistorical) return <div>Loading...</div>;
  if (worldWideError) return <div>Error loading worldwide data</div>;
  if (countriesError) return <div>Error loading countries data</div>;
  if (historicalError) return <div>Error loading historical data</div>;

  const lineChartData = {
    labels: Object.keys(historicalData.cases),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(historicalData.cases),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Recovered',
        data: Object.values(historicalData.recovered),
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
      {
        label: 'Deaths',
        data: Object.values(historicalData.deaths),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  };

  const barChartData = {
    labels: countriesData.map((country: any) => country.country),
    datasets: [
      {
        label: 'Active Cases',
        data: countriesData.map((country: any) => country.active),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Cases', 'Recovered', 'Deaths'],
    datasets: [
      {
        data: [worldWideData.cases, worldWideData.recovered, worldWideData.deaths],
        backgroundColor: [
          'rgba(75,192,192,0.6)',
          'rgba(153,102,255,0.6)',
          'rgba(255,99,132,0.6)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl mb-4 ml-4">COVID-19 Cases Fluctuations</h1>
        <div className="bg-white p-4 rounded shadow-lg">
          <div className="relative h-96">
            <Line data={lineChartData} options={options} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl mb-4 ml-4">Country Specific Active Cases</h1>
        <div className="bg-white p-4 rounded shadow-lg">
          <div className="relative h-96">
            <Bar data={barChartData} options={options} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl mb-4 ml-4">Worldwide COVID-19 Distribution</h1>
        <div className="bg-white p-4 rounded shadow-lg">
          <div className="relative h-96">
            <Pie data={pieChartData} options={options} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl mb-4 ml-4">COVID-19 Cases Map</h1>
        <div className="bg-white p-4 rounded shadow-lg">
          <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countriesData.map((country: any) => (
              <Marker
                key={country.countryInfo.iso2}
                position={[country.countryInfo.lat, country.countryInfo.long]}
              >
                <Popup>
                  <div>
                    <h2>{country.country}</h2>
                    <p>Active: {country.active}</p>
                    <p>Recovered: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
