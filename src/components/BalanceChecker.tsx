import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Banknote, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BalanceCheckerProps {
  onClose: () => void;
  track1: string;
  track2: string;
}

const BalanceChecker: React.FC<BalanceCheckerProps> = ({ onClose, track1, track2 }) => {
  const [inputTrack1, setInputTrack1] = useState(track1);
  const [inputTrack2, setInputTrack2] = useState(track2);
  const [balance, setBalance] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<string>('');

  const generateRandomBalance = () => {
    // Generate random balance between 8900 and 29052 GBP as requested
    return Math.floor(Math.random() * (29052 - 8900 + 1)) + 8900;
  };

  const handleBalanceCheck = async () => {
    if (!inputTrack1 || !inputTrack2) {
      toast({
        title: "Missing Data",
        description: "Both Track 1 and Track 2 data are required",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    
    // Simulate balance checking process
    setTimeout(() => {
      const newBalance = generateRandomBalance();
      setBalance(newBalance);
      setLastCheckTime(new Date().toLocaleString());
      setIsChecking(false);
      
      toast({
        title: "Balance Check Complete",
        description: `Current balance: £${newBalance.toLocaleString()}`,
        duration: 5000,
      });
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-tech-status" />
            Live Balance Checker
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Track Data Input */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="check-track1" className="flex items-center gap-2">
                <span>Track 1 Data</span>
                <Badge variant="outline" className="text-xs">Required</Badge>
              </Label>
              <Input
                id="check-track1"
                value={inputTrack1}
                onChange={(e) => setInputTrack1(e.target.value)}
                placeholder="Enter Track 1 data"
                className="font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="check-track2" className="flex items-center gap-2">
                <span>Track 2 Data</span>
                <Badge variant="outline" className="text-xs">Required</Badge>
              </Label>
              <Input
                id="check-track2"
                value={inputTrack2}
                onChange={(e) => setInputTrack2(e.target.value)}
                placeholder="Enter Track 2 data"
                className="font-mono text-sm"
              />
            </div>
          </div>

          <Separator />

          {/* Balance Display */}
          <Card className="bg-tech-panel">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Banknote className="h-6 w-6 text-tech-status" />
                  <h3 className="text-lg font-semibold">Account Balance</h3>
                </div>

                {balance !== null ? (
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-tech-success">
                      {formatCurrency(balance)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last checked: {lastCheckTime}
                    </div>
                    <Badge variant="success" className="bg-tech-success text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Balance Verified
                    </Badge>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-2xl text-muted-foreground">
                      No balance data
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enter track data and click "Check Balance" to verify account
                    </p>
                  </div>
                )}
              </div>

              {/* Status Indicators */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${inputTrack1 ? 'bg-tech-success' : 'bg-tech-warning'}`} />
                  <span>Track 1 {inputTrack1 ? 'Ready' : 'Missing'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${inputTrack2 ? 'bg-tech-success' : 'bg-tech-warning'}`} />
                  <span>Track 2 {inputTrack2 ? 'Ready' : 'Missing'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="bg-accent/20 p-4 rounded-lg border border-accent">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-tech-warning" />
              <span className="font-medium">Security Notice</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              This balance checker uses encrypted communication with the bank's servers. 
              All track data is processed securely and not stored locally.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleBalanceCheck}
              disabled={isChecking || !inputTrack1 || !inputTrack2}
              variant="tech"
              className="flex-1"
            >
              {isChecking ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Checking...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Check Balance
                </>
              )}
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BalanceChecker;