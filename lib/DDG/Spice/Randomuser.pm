package DDG::Spice::Randomuser;

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 0;
spice proxy_cache_valid => '418 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

spice from => "(.+)";
spice to => 'https://randomuser.me/api/?gender=$1';

triggers any => 'random user', 'random person', 'random male', 'random female';

sub random_gender {
    my $num = int(rand(1));
    return $num == 0 ? "male" : "female";
}

# Handle statement
handle query_lc => sub {
    my $gender;
    
    srand();
    
    $gender = $1 if $req->query_lc =~ m/(female|male)/;
    $gender = random_gender() if $req->query_lc =~ m/person|user/;
    return $gender;
};

1;