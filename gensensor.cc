#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main(int argc, char* argv[]){
	double ran;
	double ran1;
	srand(time(NULL));
	float to_lat, from_lat, to_lon, from_lon;
	from_lat = 41.392101;
	to_lat = 41.359744;
	from_lon = 2.130498;
	to_lon = 2.171751;
	ran = ((double) rand() / (RAND_MAX));
	ran1 = ((double) rand() / (RAND_MAX));
	cout << "{\"sensors\":[{\"sensor\":\"L"<< argv[1]<<"\",\"type\":\"luminosity\", \"dataType\":\"number\",\"unit\":\"%\",\"component\":\"CL" << argv[1] <<"\",\"componentType\":\"luminosity\",\"location\":\""<< ran * (to_lat - from_lat) + from_lat <<" "<<ran1 * (to_lon - from_lon) + from_lon <<"\",\"timeZone\":\"CET\" }]}  " <<endl;
}
