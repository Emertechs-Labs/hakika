import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/leaderboard/top');
      setLeaders(response.data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  const getIcon = (index) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">{index + 1}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaders.map((user, index) => (
            <div key={user._id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              {getIcon(index)}
              <div className="flex-1">
                <p className="font-medium">{user.walletAddress.substring(0, 10)}...</p>
                <p className="text-sm text-muted-foreground">Reputation: {user.reputation}</p>
                <div className="flex gap-1 mt-1">
                  {user.badges.map((badge, i) => (
                    <span key={i} className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;