#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main(int argc, char* argv[]){
	double ran;
	srand(time(NULL));
	float to_lat, from_lat, to_lon, from_lon;
	from_lat = 41.389232;
	to_lat = 41.408161;
	from_lon = 2.150570;
	to_lon = 2.198070;
	ran = ((double) rand() / (RAND_MAX));
	cout << "{\"sensors\":[{\"sensor\":\""<< argv[1]<<"\",\"type\":\"luminosity\", \"dataType\":\"number\",\"unit\":\"%\",\"component\":\"C" << argv[1] <<"\",\"componentType\":\"luminosity\",\"location\":\""<< ran * (to_lat - from_lat) + from_lat <<" "<<ran * (to_lon - from_lon) + from_lon <<"\",\"timeZone\":\"CET\" }]}  " <<endl;

}
