#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main(int argc, char* argv[]){
	int ran;
	srand(time(NULL));

	for(int i = 0; i < 600 ; ++i){
		ran = rand()%100;
		cout <<"curl -X PUT -H \"IDENTITY_KEY:c61a6bfe99345f8912c455c9f80f04221fdfb9f094619063518481404564ae77\" http://api.thingtia.cloud/data/myProvider1/L"<< i<< "/" << ran << endl;
		ran = rand()%100;
		cout <<"curl -X PUT -H \"IDENTITY_KEY:c61a6bfe99345f8912c455c9f80f04221fdfb9f094619063518481404564ae77\" http://api.thingtia.cloud/data/myProvider1/N"<< i<< "/" << -ran << endl;
		ran = rand()%100;
		cout <<"curl -X PUT -H \"IDENTITY_KEY:c61a6bfe99345f8912c455c9f80f04221fdfb9f094619063518481404564ae77\" http://api.thingtia.cloud/data/myProvider1/R"<< i<< "/" << ran << endl;
		ran = rand()%100;
		cout <<"curl -X PUT -H \"IDENTITY_KEY:c61a6bfe99345f8912c455c9f80f04221fdfb9f094619063518481404564ae77\" http://api.thingtia.cloud/data/myProvider1/P"<< i<< "/" << ran << endl;
		ran = rand()%100;
		cout <<"curl -X PUT -H \"IDENTITY_KEY:c61a6bfe99345f8912c455c9f80f04221fdfb9f094619063518481404564ae77\" http://api.thingtia.cloud/data/myProvider1/A"<< i<< "/" << -ran << endl;
	}
}