import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Check, Usb, CreditCard, Shield, Database, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import BalanceChecker from '@/components/BalanceChecker';

const EmvReaderWriter = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("MCR300-EMV-WR");
  const [cardData, setCardData] = useState({
    title: "",
    pin: "",
    cardFormat: "",
    account: "",
    cardType: "",
    issueDate: "",
    expiryDate: "",
    country: "",
    lastName: "",
    firstName: "",
    extraInfo: "",
    track1: "",
    track2: "",
    track3: ""
  });
  
  const [features, setFeatures] = useState({
    dynamicAuth: false,
    loadResponse: false,
    authCrypto: false,
    loadArqc: false,
    arqc: false,
    track1: true,
    track2: true,
    track3: false
  });

  const [showBalanceChecker, setShowBalanceChecker] = useState(false);

  useEffect(() => {
    // Simulate device detection
    setTimeout(() => {
      toast({
        title: "Device Detection",
        description: "MCR300-EMV-WR detected and ready",
        duration: 3000,
      });
    }, 1000);
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast({
        title: "Connected",
        description: `Successfully connected to ${selectedDevice}`,
        duration: 3000,
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "Device disconnected",
      duration: 2000,
    });
  };

  const handleReadCard = () => {
    // Simulate card reading
    const mockData = {
      track1: "%B4111111111111111^DOE/JOHN^2512101000000000000000?",
      track2: ";4111111111111111=25121010000000000000?",
      track3: "",
      account: "4111111111111111",
      cardType: "VISA",
      lastName: "DOE",
      firstName: "JOHN",
      expiryDate: "12/25"
    };
    
    setCardData({ ...cardData, ...mockData });
    toast({
      title: "Card Read Success",
      description: "Card data loaded successfully",
      duration: 3000,
    });
  };

  const handleWriteCard = () => {
    // Simulate write error as requested
    toast({
      title: "Write Error",
      description: (
        <span className="text-tech-error font-bold">CODE 025</span>
      ),
      variant: "destructive",
      duration: 5000,
    });
  };

  const handleDuplicateCard = () => {
    toast({
      title: "Duplicate Card",
      description: "Card duplication initiated",
      duration: 3000,
    });
  };

  const handleEraseCard = () => {
    setCardData({
      title: "",
      pin: "",
      cardFormat: "",
      account: "",
      cardType: "",
      issueDate: "",
      expiryDate: "", 
      country: "",
      lastName: "",
      firstName: "",
      extraInfo: "",
      track1: "",
      track2: "",
      track3: ""
    });
    toast({
      title: "Card Erased",
      description: "All card data cleared",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader className="bg-tech-panel">
            <CardTitle className="flex items-center gap-2 text-tech-status">
              <CreditCard className="h-6 w-6" />
              EMV Reader Writer Software v8.6
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Control Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Device Connection */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-tech-panel rounded-lg">
                  <div className="flex items-center gap-2">
                    <Usb className="h-5 w-5 text-tech-status" />
                    <Label className="font-medium">Connect Hardware</Label>
                  </div>
                  <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MCR300-EMV-WR">MCR300-EMV-WR</SelectItem>
                      <SelectItem value="MCR200">MCR200</SelectItem>
                      <SelectItem value="ACR38">ACR38</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {!isConnected ? (
                    <Button 
                      onClick={handleConnect} 
                      disabled={isConnecting}
                      variant="tech"
                      className="min-w-24"
                    >
                      {isConnecting ? "Connecting..." : "Connect"}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge variant="success" className="bg-tech-success text-white">
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                      <Button onClick={handleDisconnect} variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button onClick={handleReadCard} disabled={!isConnected} variant="tech">
                    Read Card
                  </Button>
                  <Button onClick={handleWriteCard} disabled={!isConnected} variant="tech">
                    Write Card
                  </Button>
                  <Button onClick={handleDuplicateCard} disabled={!isConnected} variant="tech">
                    Duplicate Card
                  </Button>
                  <Button onClick={handleEraseCard} disabled={!isConnected} variant="outline">
                    Erase Card
                  </Button>
                  <Button 
                    onClick={() => setShowBalanceChecker(!showBalanceChecker)}
                    variant="secondary"
                    className="ml-auto"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Balance Checker
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* Card Information Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Select value={cardData.title} onValueChange={(value) => setCardData({...cardData, title: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Dr">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pin">PIN #</Label>
                    <Input
                      id="pin"
                      type="password"
                      value={cardData.pin}
                      onChange={(e) => setCardData({...cardData, pin: e.target.value})}
                      placeholder="Enter PIN"
                      maxLength={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardFormat">Card Format</Label>
                    <Select value={cardData.cardFormat} onValueChange={(value) => setCardData({...cardData, cardFormat: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ISO">ISO Format</SelectItem>
                        <SelectItem value="AAMVA">AAMVA Format</SelectItem>
                        <SelectItem value="Custom">Custom Format</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="account">Account #</Label>
                    <Input
                      id="account"
                      value={cardData.account}
                      onChange={(e) => setCardData({...cardData, account: e.target.value})}
                      placeholder="Account number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardType">Card Type</Label>
                    <Select value={cardData.cardType} onValueChange={(value) => setCardData({...cardData, cardType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VISA">VISA</SelectItem>
                        <SelectItem value="MASTERCARD">MASTERCARD</SelectItem>
                        <SelectItem value="AMEX">AMERICAN EXPRESS</SelectItem>
                        <SelectItem value="DISCOVER">DISCOVER</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={cardData.country} onValueChange={(value) => setCardData({...cardData, country: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={cardData.issueDate}
                      onChange={(e) => setCardData({...cardData, issueDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={cardData.expiryDate}
                      onChange={(e) => setCardData({...cardData, expiryDate: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={cardData.lastName}
                      onChange={(e) => setCardData({...cardData, lastName: e.target.value})}
                      placeholder="Last name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={cardData.firstName}
                      onChange={(e) => setCardData({...cardData, firstName: e.target.value})}
                      placeholder="First name"
                    />
                  </div>
                </div>

                {/* Extra Info */}
                <div className="mb-6">
                  <Label htmlFor="extraInfo">Extra Info</Label>
                  <Textarea
                    id="extraInfo"
                    value={cardData.extraInfo}
                    onChange={(e) => setCardData({...cardData, extraInfo: e.target.value})}
                    placeholder="Additional information..."
                    rows={3}
                  />
                </div>

                {/* Track Data */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-tech-track p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox
                        id="track1"
                        checked={features.track1}
                        onCheckedChange={(checked) => setFeatures({...features, track1: checked as boolean})}
                      />
                      <Label htmlFor="track1" className="font-medium">Track 1#</Label>
                    </div>
                    <Input
                      value={cardData.track1}
                      onChange={(e) => setCardData({...cardData, track1: e.target.value})}
                      placeholder="Track 1 data"
                      disabled={!features.track1}
                      className="font-mono"
                    />
                  </div>

                  <div className="bg-tech-track p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox
                        id="track2"
                        checked={features.track2}
                        onCheckedChange={(checked) => setFeatures({...features, track2: checked as boolean})}
                      />
                      <Label htmlFor="track2" className="font-medium">Track 2#</Label>
                    </div>
                    <Input
                      value={cardData.track2}
                      onChange={(e) => setCardData({...cardData, track2: e.target.value})}
                      placeholder="Track 2 data"
                      disabled={!features.track2}
                      className="font-mono"
                    />
                  </div>

                  <div className="bg-tech-track p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox
                        id="track3"
                        checked={features.track3}
                        onCheckedChange={(checked) => setFeatures({...features, track3: checked as boolean})}
                      />
                      <Label htmlFor="track3" className="font-medium">Track 3#</Label>
                    </div>
                    <Input
                      value={cardData.track3}
                      onChange={(e) => setCardData({...cardData, track3: e.target.value})}
                      placeholder="Track 3 data"
                      disabled={!features.track3}
                      className="font-mono"
                    />
                  </div>
                </div>

                {/* Feature Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-tech-status">Enable Options</h4>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dynamicAuth"
                        checked={features.dynamicAuth}
                        onCheckedChange={(checked) => setFeatures({...features, dynamicAuth: checked as boolean})}
                      />
                      <Label htmlFor="dynamicAuth">Dynamic Data Authentication</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="loadResponse"
                        checked={features.loadResponse}
                        onCheckedChange={(checked) => setFeatures({...features, loadResponse: checked as boolean})}
                      />
                      <Label htmlFor="loadResponse">Load Response</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="authCrypto"
                        checked={features.authCrypto}
                        onCheckedChange={(checked) => setFeatures({...features, authCrypto: checked as boolean})}
                      />
                      <Label htmlFor="authCrypto">Authorization Response Cryptogram</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-tech-status">ARQC Options</h4>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="loadArqc"
                        checked={features.loadArqc}
                        onCheckedChange={(checked) => setFeatures({...features, loadArqc: checked as boolean})}
                      />
                      <Label htmlFor="loadArqc">Load ARQC Key</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="arqc"
                        checked={features.arqc}
                        onCheckedChange={(checked) => setFeatures({...features, arqc: checked as boolean})}
                      />
                      <Label htmlFor="arqc">ARQC</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* License Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">License Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge variant="success" className="bg-tech-success text-white mb-2">
                    Valid
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    HWID: 7G2FRG24EE4!FBE304BTHR
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Error Check
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Save Data
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Import DB
                </Button>
                <Button variant="destructive" size="sm" className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  EXIT
                </Button>
              </CardContent>
            </Card>

            {/* Record Date */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Label className="text-xs text-muted-foreground">Record Date:</Label>
                  <p className="text-sm font-mono">{new Date().toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Balance Checker Modal */}
        {showBalanceChecker && (
          <BalanceChecker 
            onClose={() => setShowBalanceChecker(false)}
            track1={cardData.track1}
            track2={cardData.track2}
          />
        )}
      </div>
    </div>
  );
};

export default EmvReaderWriter;